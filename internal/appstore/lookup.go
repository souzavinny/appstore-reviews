package appstore

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strconv"
	"strings"

	"github.com/souzavinny/reviews-api/internal/domain"
)

const (
	lookupURL      = "https://itunes.apple.com/lookup"
	maxLookupBytes = 64 << 10
)

type lookupResponse struct {
	Results []lookupResult `json:"results"`
}

type lookupResult struct {
	TrackName     string `json:"trackName"`
	ArtworkURL512 string `json:"artworkUrl512"`
	ArtworkURL100 string `json:"artworkUrl100"`
}

// Lookup fetches an app's store metadata (name, icon) from the iTunes Lookup
// API — a separate endpoint from the reviews feed, which carries no app
// metadata. It returns an id-only App when the lookup has no result, so callers
// can treat name/icon as optional enrichment.
func (f *RSSFetcher) Lookup(ctx context.Context, appID string) (domain.App, error) {
	if _, err := strconv.ParseUint(appID, 10, 64); err != nil {
		return domain.App{}, fmt.Errorf("invalid app id %q: must be numeric", appID)
	}

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, fmt.Sprintf("%s?id=%s", lookupURL, appID), nil)
	if err != nil {
		return domain.App{}, err
	}
	req.Header.Set("User-Agent", "reviews-api/1.0")

	resp, err := f.client.Do(req)
	if err != nil {
		return domain.App{}, err
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return domain.App{}, fmt.Errorf("lookup app %s: status %d", appID, resp.StatusCode)
	}
	body, err := io.ReadAll(io.LimitReader(resp.Body, maxLookupBytes+1))
	if err != nil {
		return domain.App{}, err
	}
	if len(body) > maxLookupBytes {
		return domain.App{}, fmt.Errorf("lookup app %s: response exceeds %d-byte limit", appID, maxLookupBytes)
	}

	var parsed lookupResponse
	if err := json.Unmarshal(body, &parsed); err != nil {
		return domain.App{}, fmt.Errorf("decode lookup for app %s: %w", appID, err)
	}
	if len(parsed.Results) == 0 {
		return domain.App{ID: appID}, nil
	}

	result := parsed.Results[0]
	icon := result.ArtworkURL512
	if icon == "" {
		icon = result.ArtworkURL100
	}
	if !isAppleArtworkURL(icon) {
		icon = ""
	}
	return domain.App{ID: appID, Name: result.TrackName, IconURL: icon}, nil
}

// isAppleArtworkURL guards what we persist into IconURL and ultimately render
// as an <img> src: only https URLs on Apple's artwork CDN.
func isAppleArtworkURL(raw string) bool {
	u, err := url.Parse(raw)
	if err != nil || u.Scheme != "https" {
		return false
	}
	host := u.Hostname()
	return host == "mzstatic.com" || strings.HasSuffix(host, ".mzstatic.com")
}

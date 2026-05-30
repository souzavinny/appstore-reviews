package domain

// App is a monitored iOS app in the registry.
type App struct {
	ID      string `json:"id"`
	Name    string `json:"name,omitempty"`
	IconURL string `json:"iconUrl,omitempty"`
}

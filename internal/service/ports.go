// Package service defines the interface seams between the domain and the
// storage, feed, and HTTP edges. The application logic built on these seams
// lands in later milestones.
package service

import (
	"context"

	"github.com/souzavinny/reviews-api/internal/domain"
)

// ReviewStore persists reviews per app and survives restarts.
type ReviewStore interface {
	Save(ctx context.Context, appID string, reviews []domain.Review) error
	ListByApp(ctx context.Context, appID string) ([]domain.Review, error)
}

// ReviewFetcher retrieves reviews for an app from the upstream feed.
type ReviewFetcher interface {
	Fetch(ctx context.Context, appID string) ([]domain.Review, error)
	Exists(ctx context.Context, appID string) (bool, error)
}

// AppRegistry is the persisted set of apps to monitor.
type AppRegistry interface {
	List(ctx context.Context) ([]domain.App, error)
	Add(ctx context.Context, app domain.App) error
	Remove(ctx context.Context, appID string) error
}

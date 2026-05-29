package domain

import "time"

// Summary aggregates a single app's stored reviews.
type Summary struct {
	Total       int         `json:"total"`
	Average     float64     `json:"average"`
	CountByStar map[int]int `json:"countByStar"`
	LastUpdated time.Time   `json:"lastUpdated"`
}

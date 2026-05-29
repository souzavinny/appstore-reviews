# reviews-api — project notes
- Go 1.22+ stdlib ServeMux (no router framework). No third-party libs on the backend.
- Errors: explicit `error` returns for expected/recoverable failures (the Result-type analog);
  panic/recover only for truly unrecoverable conditions. Idiomatic Go over cross-language defaults.
- Architecture: three layers — domain / service+interfaces / thin edge (storage, appstore, http).

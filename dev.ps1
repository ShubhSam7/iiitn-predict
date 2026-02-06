# Set Go environment variables for Windows
$env:GOCACHE = "$env:USERPROFILE\AppData\Local\go-build"
$env:GOPATH = "$env:USERPROFILE\go"
$env:LOCALAPPDATA = "$env:USERPROFILE\AppData\Local"

# Run pnpm dev
pnpm run dev

# Start from the official Golang image
FROM golang:1.22-alpine

# Set working directory
WORKDIR /app

# Copy ALL files (Source code + go.mod)
COPY . .

# VITAL FIX: This command scans your code and downloads the missing libraries (Gin/CORS)
RUN go mod tidy

# Build the application
RUN go build -o main .

# Run the executable
CMD ["./main"]
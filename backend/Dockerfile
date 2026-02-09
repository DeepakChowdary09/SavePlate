# Start from the official Golang image
FROM golang:1.22-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY go.mod ./

# Download dependencies
RUN go mod download

# Copy the source code
COPY . .

# Build the application
RUN go build -o main .

# Run the executable
CMD ["./main"]
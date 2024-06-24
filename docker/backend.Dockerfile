FROM golang:1.22 AS local

RUN mkdir /go/src/myapp
WORKDIR /go/src/myapp

RUN go install github.com/cosmtrek/air@v1.51.0

FROM local AS prosuction
CMD ["go", "run", "main.go"]

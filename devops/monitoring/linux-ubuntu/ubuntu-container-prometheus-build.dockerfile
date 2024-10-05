# Use an official Ubuntu base image
FROM ubuntu:22.04

# Install necessary packages
RUN apt-get update && \
    apt-get install -y wget

# Download and install Prometheus
RUN wget https://github.com/prometheus/prometheus/releases/download/v2.37.0/prometheus-2.37.0.linux-amd64.tar.gz && \
    tar xvf prometheus-*.tar.gz && \
    mv prometheus-2.37.0.linux-amd64 /etc/prometheus

# Set the working directory
WORKDIR /etc/prometheus

# Expose the Prometheus port
EXPOSE 9090

# Start Prometheus
CMD ["./prometheus", "--config.file=/etc/prometheus/prometheus.yml"]

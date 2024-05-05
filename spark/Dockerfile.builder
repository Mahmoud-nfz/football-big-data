FROM alpine

RUN apk update && \
    apk add zip

CMD ["sh", "-c", "cd /opt/spark/work-dir/src && zip -r -FS ../src.zip ."]

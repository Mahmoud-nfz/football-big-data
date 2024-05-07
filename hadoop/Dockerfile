FROM apache/hadoop:3.3.6

USER root

# Install dependencies for building Python
RUN yum update -y
RUN yum install -y \
    wget \
    gcc \
    openssl-devel \
    bzip2-devel \
    libffi-devel \
    make \
    zlib-devel \
    xz-devel \
    tk-devel \
    gdbm-devel \
    ncurses-devel \
    readline-devel \
    sqlite-devel \
    libdb-devel

# Download and extract Python 3.10
RUN wget https://www.python.org/ftp/python/3.10.13/Python-3.10.13.tgz && \
    tar xzf Python-3.10.13.tgz && \
    cd Python-3.10.13 && \
    ./configure --enable-optimizations && \
    make altinstall

# Cleanup
RUN rm -rf Python-3.10.13.tgz Python-3.10.13
RUN yum remove -y \
    wget \
    gcc \
    openssl-devel \
    bzip2-devel \
    libffi-devel \
    make \
    zlib-devel \
    xz-devel \
    tk-devel \
    gdbm-devel \
    ncurses-devel \
    readline-devel \
    sqlite-devel \
    libdb-devel
RUN yum clean all
RUN rm -rf /var/cache/yum

USER hadoop

ENV PYSPARK_PYTHON=/usr/bin/python3

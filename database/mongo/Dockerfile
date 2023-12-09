FROM mongo:7
#FROM arm64v8/mongo:latest
MAINTAINER support@stapleton.group
COPY ./mongod.conf /etc
CMD ["mongod", "--bind_ip_all", "--wiredTigerEngineConfigString=cache_size=3G"]

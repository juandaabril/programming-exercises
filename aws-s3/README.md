# AWS S3

## Image Service with Dynamic Storage Backend (Local Filesystem or AWS S3)

The following microservice allows users to upload and retrieve images. The current implementation stores images in the
local filesystem, but a problem arises when scaling horizontally or creating a new server, as the images are not present
in the new replicas or the new server. To address this issue, we need to refactor the code to dynamically switch between
storing images in the local filesystem or AWS S3, based on an environment variable. By default, the images should be
stored in S3.

## Users

- id: 1f2d3e4c-5b6a-7d8c-9e0f-1a2b3c4d5e6f
- name: John Doe
---
- id: 9a8b7c6d-5e4f-3g2h-1i0j-9k8l7m6n5o4p
-  name: Jane Smith


## Request

You can run this command in your command line interface to execute the transfer request using curl. Make sure that your
server is running on port 3000, and adjust the URL accordingly based on your specific setup.

*Upload a file*
```
curl -X POST -H "Content-Type: multipart/form-data" -F "file=@path/to/file.jpg" http://localhost:8080/upload/1f2d3e4c-5b6a-7d8c-9e0f-1a2b3c4d5e6f
```

*Get a file*
```
curl -O http://localhost:8080/image/1f2d3e4c-5b6a-7d8c-9e0f-1a2b3c4d5e6f/file.jpg
```
# backend/create_bucket.py
import boto3
from botocore.exceptions import ClientError
import os
import time

time.sleep(10)  # espera MinIO subir

s3 = boto3.client(
    's3',
    endpoint_url=os.environ.get('MINIO_ENDPOINT', 'http://minio:9000'),
    aws_access_key_id=os.environ.get('MINIO_ACCESS_KEY', 'minioadmin'),
    aws_secret_access_key=os.environ.get('MINIO_SECRET_KEY', 'minioadmin'),
)

bucket_name = os.environ.get('MINIO_BUCKET_NAME', 'cms-media')

try:
    s3.head_bucket(Bucket=bucket_name)
    print(f"Bucket {bucket_name} já existe.")
except ClientError:
    s3.create_bucket(Bucket=bucket_name)
    print(f"Bucket {bucket_name} criado.")
    
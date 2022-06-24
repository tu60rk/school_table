from django.test import TestCase



import hashlib
hash_object = hashlib.md5(b'Hello World' + b'Hello World' + b'Hello World' + b'Hello World' + b'Hello World')
print(len(hash_object.hexdigest()))

# Create your tests here.
# b10a8db164e0754105b7a99be72e3fe5
# b10a8db164e0754105b7a99be72e3fe5

# 8d23523511b7337dcd5ee9f7739d81cf
from django.test import TestCase
import hashlib


string_data = '{0} {1} {2} {3} {4}'.format(
                'Moscow', 
                'RU', 
                '213.87.145.30', 
                '55.7522,37.6156', 
                'Moscow'
                )  
hash_object = hashlib.md5(string_data.encode('utf-8'))
print(hash_object.hexdigest())

print(hashlib.md5('8d23523511b7337dcd5ee9f7739d81cf'.encode()).hexdigest())
hashlib.algorithms_available._hash()
# Create your tests here.
# b10a8db164e0754105b7a99be72e3fe5
# b10a8db164e0754105b7a99be72e3fe5

# 8d23523511b7337dcd5ee9f7739d81cf
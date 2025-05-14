# import requests
# import random
# import time

# # Simulated distress keywords
# DISTRESS_KEYWORDS = ["help", "sos", "emergency", "911", "save me", "distress", "assistance", "trapped", "danger"]

# # Simulate random distress message with timestamp
# def generate_alert():
#     transcription = random.choice(DISTRESS_KEYWORDS) + " I need help!"
#     # timestamp = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
#     # location = "22.5726,88.3639"  # Simulating a random location (you can replace it with dynamic values)
#     return {"transcription": transcription}

# # Send alert to Express backend
# def send_alert_to_backend():
#     url = "http://localhost:3000/alert"  # Change this if the server is hosted elsewhere
#     alert_data = generate_alert()
    
#     try:
#         response = requests.post(url, json=alert_data)
#         if response.status_code == 200:
#             print(f"Alert sent: {alert_data}")
#         else:
#             print("Failed to send alert")
#     except Exception as e:
#         print(f"Error: {e}")

# # Simulate sending alerts every 10 seconds
# if __name__ == "__main__":
#     while True:
#         send_alert_to_backend()
#         time.sleep(10)  # Send an alert every 10 seconds


import requests
import random
import time

# Simulated distress keywords
DISTRESS_KEYWORDS = ["help", "sos", "emergency", "911", "save me", "distress", "assistance", "trapped", "danger"]

# Simulate random distress message with timestamp
def generate_alert():
    transcription = random.choice(DISTRESS_KEYWORDS) + " I need help!"
    return {"transcription": transcription}

# Send alert to Express backend
def send_alert_to_backend():
    url = "http://localhost:3000/api/alerts"  # Correct URL to match Express backend
    alert_data = generate_alert()
    
    try:
        response = requests.post(url, json=alert_data)
        if response.status_code == 200:
            print(f"Alert sent: {alert_data}")
        else:
            print(f"Failed to send alert: {response.status_code}")
    except Exception as e:
        print(f"Error: {e}")

# Simulate sending alerts every 10 seconds
if __name__ == "__main__":
    while True:
        send_alert_to_backend()
        time.sleep(10)  # Send an alert every 10 seconds

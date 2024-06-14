import subprocess
import json
import os

absolute_dir_path = os.path.dirname(os.path.abspath(__file__))
def run_build_command():
    global absolute_dir_path
    try:
        result = subprocess.run(
            ["npm", "run", "export"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            shell=True, cwd=absolute_dir_path
        )
    except Exception as e:
        print(f"An error occurred: {e}")


def send_emails_node(emails):
    global absolute_dir_path
    with open("api/mailing/emails.json", "w") as file:
        json.dump(emails, file)
    try:
        subprocess.run(
            ["node", "send.js"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            shell=True,  cwd=absolute_dir_path
        )
    except Exception as e:
        print(f"An error occurred: {e}")


def send_emails_to_list(data, message, emails):
    print("started sending emails")
    with open("api/mailing/email_data.json", "w", encoding="utf-8") as file:
        json.dump({"data": data, "message": ". ".join([m["title"] for m in message])}, file, indent=4)
    print("started started writing file")
    run_build_command()
    print("started building")
    send_emails_node(emails)
    print("started sending")



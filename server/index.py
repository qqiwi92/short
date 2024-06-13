import subprocess
import signal
import sys
from termcolor import colored


def run_command(command):
    # Запускает команду в отдельном процессе и возвращает ее вывод
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = process.communicate()
    return stdout.decode(), stderr.decode()


def start_cron():
    run_command(["python", "api/start_cron.py"])


def start_flask_server():
    run_command(["python", "api/flask_server.py"])


def signal_handler(sig, frame):
    print("exiting...")
    global parser_process, flask_server_process
    parser_process.terminate()
    flask_server_process.terminate()
    sys.exit(0)


if __name__ == "__main__":
    global parser_process, flask_server_process

    signal.signal(signal.SIGINT, signal_handler)

    print(colored("+ ", "green"), " starting cron jobs")
    parser_process = subprocess.Popen(
        ["python", "api/start_cron.py"], stdout=subprocess.PIPE, stderr=subprocess.PIPE
    )
    print(colored("+ ", "green"), " starting flask server")
    print("hosting on", colored("http://localhost:5000/data", "blue"))
    print("press Ctrl+C to exit")
    flask_server_process = subprocess.Popen(
        ["python", "api/flask_server.py"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )

    parser_process.wait()
    flask_server_process.wait()

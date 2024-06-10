import subprocess
import signal
import sys
from termcolor import colored


def run_command(command):
    # Запускает команду в отдельном процессе и возвращает ее вывод
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = process.communicate()
    return stdout.decode(), stderr.decode()


def start_parser():
    # Запускает парсер в отдельном потоке
    run_command(["python", "api/start_cron.py"])


def start_flask_server():
    # Запускает Flask-сервер в отдельном потоке
    run_command(["python", "api/flask_server.py"])


def signal_handler(sig, frame):
    # Обрабатывает сигнал Ctrl+C, завершая все потоки
    print("exiting...")
    global parser_process, flask_server_process
    parser_process.terminate()
    flask_server_process.terminate()
    sys.exit(0)


if __name__ == "__main__":
    # Устанавливаем глобальные переменные для хранения процессов
    global parser_process, flask_server_process

    # Устанавливаем обработчик для SIGINT для завершения процессов
    signal.signal(signal.SIGINT, signal_handler)

    # Запускаем парсер и Flask-сервер в отдельных процессах
    print(colored("+ ", "green"), " starting parser")
    parser_process = subprocess.Popen(
        ["python", "api/start_cron.py"], stdout=subprocess.PIPE, stderr=subprocess.PIPE
    )
    print(colored("+ ", "green"), " starting flask server")
    print("hosting on", colored("http://localhost:5000/data", "blue"))
    print("press Ctrl+C to exit")
    flask_server_process = subprocess.Popen(
        ["python", "api/flask-server.py"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )

    # Ждем завершения обоих процессов
    parser_process.wait()
    flask_server_process.wait()

import unittest
import subprocess
import os
import signal
import time

class TestIndexPy(unittest.TestCase):
    def setUp(self):
        self.index_process = subprocess.Popen(
            ["python", "index.py"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            preexec_fn=os.setsid
        )
        time.sleep(5)

    def tearDown(self):
        os.killpg(os.getpgid(self.index_process.pid), signal.SIGTERM)
        self.index_process.wait()

    def test_index_running(self):
        return_code = self.index_process.poll()
        self.assertIsNone(return_code, "index.py не работает")

    def test_cron_running(self):
        cron_process = subprocess.run(["pgrep", "-f", "start_cron.py"], stdout=subprocess.PIPE)
        self.assertTrue(cron_process.stdout, "start_cron.py не запущен")

    def test_flask_running(self):
        flask_process = subprocess.run(["pgrep", "-f", "flask_server.py"], stdout=subprocess.PIPE)
        self.assertTrue(flask_process.stdout, "flask_server.py не запущен")

if __name__ == "__main__":
    unittest.main()

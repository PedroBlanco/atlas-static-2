# Prueba inicial de selenium
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from time import sleep

timeStep = 0.5

print ("*** Iniciando 01_test ***")

driver = webdriver.Chrome(ChromeDriverManager().install())
driver.maximize_window()
driver.get("http://localhost:8080/")
print ("Título:", driver.title )
print ("URL:", driver.current_url )

sleep(timeStep)

driver.get("http://localhost:8080/acerca-de/")

sleep(timeStep * 5)

# driver.quit()

print ("*** Terminando 01_test ***")

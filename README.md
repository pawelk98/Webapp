Instrukcja uruchomienia:

1 Klonujemy repozytorium i umieszczamy w katalogu /var/www  
  
2 Instalujemy wymagane paczki  
curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -  
sudo apt-get update  
sudo apt-get install -y nodejs nginx npm  
sudo npm install -g pm2  
  
3 Konfigurujemy nginx'a  
sudo nano -n /etc/nginx/nginx.conf  
i wklejamy zawartość pliku nginx config z repozytorium  
  
restartujemy  
sudo systemctl restart nginx  
  
4 Konfigurujemy dane dostępowe do api  
nano /var/www/webapp/config.js  
  
Należy uzupełnić swoimi danymi login, hasło i agent number.  
  
5 Startujemy frontend naszej aplikacji  
cd /var/www/webapp/front  
npm ci  
npm run build  
  
6 Startujemy backend  
cd /var/www/webapp  
npm ci  
pm2 start index.js  
  
  
  
Instrukcja ansible  
  
1 Klonujemy repozytorium  
  
2 Pobieramy paczki ansible  
sudo apt update  
sudo apt install -y ansible  
  
3 Modyfikujemy inventory  
cd webapp/ansible  
nano inventory  
  
i dodajemy adresy ip maszyn, na których zainstalujemy naszą aplikację, np  
[azure]  
20.219.90.248  
  
4 Uruchamiamy playbooka  
ansible-playbook -K -e "target=azure" -i inventory install.yml  
  
5 Na wszystkich maszynach konfigurujemy dane dostępowe do api, tak jak w instrukcji uruchomienia a następnie startujemy backend  
pm2 start index.js  

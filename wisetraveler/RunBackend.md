GO INTO SRC/BACKEND/APP
install python 3.12
run ./install_requirements.sh
or install requirements via pip 
aka pip -r requirements.txt
run uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
then run npm run dev go to login page to see first part of iternerary.
second part is being debugged.
I added the code via api/get_route.js
but the more i read , i realized it is often way better to use fastapi for handling large amounts of api calls,
and reduces the amount of asynchronous javascript code trying to do to much at once. 


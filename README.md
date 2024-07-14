# Elevator System

This is an Angular project for simulating an elevator system. The project includes components for controlling the system, floors, and elevators, as well as services for managing the elevator logic.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (Node Package Manager).
- You have installed Angular CLI globally using the command:
  npm install -g @angular/cli
Installing
Clone the repository:
git clone https://github.com/Przemysl4wR4k/elevatorApp.git
cd elevator-system

Install the dependencies:
npm install

Running the Application
To run the application, use the following command:
ng serve
The application will be available at http://localhost:4200.

Running Tests
To run the unit tests, use the following command:
ng test
This will launch the test runner and run all tests.


Opis działania projektu
W projekcie założyłem, że użytkownicy wind od razu podają informację o tym, na jakie piętro jadą. Taki rodzaj wind mam w moim biurze w obecnej pracy, a jako że innymi windami nie za bardzo jeżdżę, to od razu pomysł na implementację poszedł w tę stronę. Wydaje mi się również, że jest to ciekawszy przypadek do analizy.

Zaimplementowane zostały dwa interfejsy:

Person

- startingFloor: początkowe piętro
- destinationFloor: końcowe piętro
- elevatorNumber: winda, w której się znajduje (0 dla korytarza)
- waitingForElevatorId: id windy, na jaką czeka (0 jeśli nie mógł żadnej wezwać)
Elevator

- id: id windy
- currentFloor: obecne piętro
- floorsToStopOn: lista pięter, na których winda ma się zatrzymać
- status: stan windy ('up' | 'down' | 'transfer' | 'wait')

Windy posiadają cztery stany: 'up', 'down', 'wait', 'transfer'. Stan 'transfer' służy do przemieszczenia ludzi pomiędzy piętrem a windą. Jeśli winda odbierze osobę, to jej piętro docelowe dodawane jest do tablicy floorsToStopOn. Winda przechodzi w stan 'wait', jeśli jej własność floorsToStopOn nie zawiera żadnych liczb. Jeśli floorsToStopOn zawiera wartość większą od currentFloor, to winda przechodzi w stan 'up', w przeciwnym przypadku przechodzi w stan 'down'.

Jeśli winda znajduje się w jednym z tych stanów, to przesuwa się o jedno piętro, a następnie sprawdza, czy ma nowe piętro w swojej tablicy floorsToStopOn. Jeśli tak, to przechodzi w stan 'transfer'. Wszystko to dzieje się w funkcji nextStep(). Pod koniec funkcji sprawdzana jest lista osób czekających na wezwanie windy, które nie mają żadnej windy, na którą czekają, i wywoływana jest dla nich funkcja callElevator().

Algorytm wywołania windy przyjmuje dwie wartości: startingFloor i destinationFloor. Sprawdza, która z wind mogłaby przewieźć tę osobę. Winda musi być albo wolna, albo przejeżdżać przez piętro startingFloor w tym samym kierunku, w którym chce jechać dana osoba, a floorsToStopOn musi zawierać wartość bardziej wysuniętą w kierunku jazdy (bardziej w górę lub w dół) niż startingFloor.

Jeśli nie ma wind spełniających podane kryteria, to człowiek nie zostaje przypisany do żadnej windy. Następną "szansę" na przypisanie będzie miał w kolejnym kroku. Jeśli natomiast takie windy są, to szukamy optymalnej.

Dla każdej z dostępnych wind obliczamy jej travelTime. Jeśli winda znajduje się już w stanie 'wait' lub 'transfer', to dodajemy +1. Dodajemy +1 za każde piętro pomiędzy obecnym piętrem windy a piętrem początkowym i tak samo za każde piętro pomiędzy destinationFloor i startingFloor. Za każde piętro, na którym winda zatrzyma się w trakcie kursu, dodajemy +2 (zmiana stanów na 'transfer' i ponownie na kierunek jazdy).







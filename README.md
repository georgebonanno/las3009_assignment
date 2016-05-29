# las3009_assignment

command examples:
  draw a square - repeat[4,fd(40); rt(90); ];
  draw two adjacent squares separated by a line: repeat[4,fd(40); rt(90); ]; lt(90); fd(70); repeat[4,fd(40); rt(90); ];
  draw a rectangle: repeat[360,fd(1); rt(1);];
  draw a circle: repeat[360,fd(1); rt(1);];
  draw 3 circles: repeat[3,repeat[360,fd(1); rt(1);];lt(90); fd(40);];

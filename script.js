// Create Scene
const root = document.getElementById('root');
root.style.display = 'flex';
root.style.justifyContent = 'center';
root.style.alignItems = 'center';
const screen = document.createElement('div');
screen.style.position = "relative";
screen.style.width = "700px";
screen.style.height = "400px";
screen.style.border = "solid 1px black";
screen.style.background = "linear-gradient(to bottom, #94c5f8 1%,#a6e6ff 70%,#b1b5ea 100%)";

const floor = document.createElement('div');
floor.style.position = "absolute";
floor.style.bottom = 0;
floor.style.width = "700px";
floor.style.height = "10px";
floor.style.border = "solid 1px green";
floor.style.backgroundColor = "green";
screen.appendChild(floor);

const box = document.createElement('div');
box.style.position = "absolute";
box.style.bottom = "12px";
box.style.right = "25px";
box.style.width = "80px";
box.style.height = "120px";
box.style.backgroundColor = "#eae060";
box.style.border = "solid 2px #bbb44f";
box.style.borderRadius = "5px";
screen.appendChild(box);

// define the perso class
class Perso {
    constructor() {
        // create its dom element and append it in the dom
        this.domElement = document.createElement('div');
        this.domElement.style.position = "absolute";
        this.domElement.style.bottom = "12px";
        this.domElement.style.left = "25px";
        this.domElement.style.width = "30px";
        this.domElement.style.height = "30px";
        this.domElement.style.backgroundColor = "red";
        this.domElement.style.border = "solid 2px black";
        this.domElement.style.borderRadius = "20px";
        this.domElement.style.transition = '0.5s ease';
        screen.appendChild(this.domElement);
    }
    // create its own variables
    lastDirectionMoved = '';
    arrivedToBox = false;
    isOnBoxTop = false;
    // function to be called on windows kepress, handle the actions according to the key pressed
    handleKeyboardEvent = (e) => {
        e.stopImmediatePropagation();
        if (e.code === 'ArrowLeft') {
            if (this.isOnBoxTop) {
                this.jumpDownBox();
            } else {
                this.movePersoLeft();
            }
        } else if (e.code === 'ArrowRight') {
            this.movePersoRight();
        } else if (e.code === 'ArrowUp') {
            if (this.arrivedToBox && !this.isOnBoxTop) {
                this.jumpOnBox();
            } else {
                this.movePersoJump();
            }
        }
    }

    // move the ball to the left and unset the arrived to the box property
    // set the last directionMoved to left
    movePersoLeft = () => {
        if (parseInt(this.domElement.style.left) - 30 > 0) {
            this.domElement.style.left = parseInt(this.domElement.style.left) - 30 + "px"
        }
        if (this.arrivedToBox) {
            this.arrivedToBox = false;
        }
        this.lastDirectionMoved = 'left';
    }
    // move the ball to the right except when arrived to the box
    // set the last directionMoved to right and when arrived to the box
    movePersoRight = () => {
        this.leftBoxPosition = parseInt(screen.style.width) - parseInt(box.style.right) - parseInt(box.style.width) - parseInt(this.domElement.style.width)
        if (parseInt(this.domElement.style.left) + 30 < this.leftBoxPosition) {
            this.domElement.style.left = parseInt(this.domElement.style.left) + 30 + "px"
        }  else {
            this.arrivedToBox = true;
        }
        this.lastDirectionMoved = 'right';
    }

    // make jump on right or on left according to the last direction moved
    movePersoJump = () => {
        this.domElement.style.bottom = parseInt(this.domElement.style.bottom) + 150 + 'px';
        if (this.lastDirectionMoved === 'left') {
            this.movePersoLeft();
        }
        if (this.lastDirectionMoved === 'right') {
            this.movePersoRight();
        }
        setTimeout(() => {
            this.domElement.style.bottom = parseInt(this.domElement.style.bottom) - 150 + 'px';
        }, 600);
    }

    // jump to the box
    jumpOnBox = () => {
        this.domElement.style.bottom = parseInt(this.domElement.style.bottom) + 150 + 'px';
        setTimeout(() => {
            this.domElement.style.bottom = '134px';
        }, 600);
        this.domElement.style.left = parseInt(this.domElement.style.left) + 60 + "px"
        this.isOnBoxTop = true;
    }
    // jump down the box
    jumpDownBox = () => {
        this.domElement.style.bottom = parseInt(this.domElement.style.bottom) + 88 + 'px';
        this.domElement.style.left = parseInt(this.domElement.style.left) - 60 + "px"
        setTimeout(() => {
            this.domElement.style.bottom = '12px';
        }, 600);
        this.isOnBoxTop = false;
    }
}

root.appendChild(screen);

// perso born
$perso = new Perso();

// call the perso method handling the keybord event.
// document.addEventListener('keydown', $perso.handleKeyboardEvent);
document.addEventListener('keydown', $perso.handleKeyboardEvent);

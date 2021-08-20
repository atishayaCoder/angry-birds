class SlingShot {
    constructor(bodyAInput, pointBInput) {

        //creation of constraint to hold body and attach it to slingshot
        var options = {
            'bodyA': bodyAInput,
            'pointB': pointBInput,
            'stiffness': 0.2,
            'length': 5
        }
        this.constraint = Matter.Constraint.create(options);

        this.sling1 = loadImage("image/sling1.png");
        this.sling2 = loadImage("image/sling2.png");
        this.sling3 = loadImage("image/sling3.png");

        World.add(userWorld, this.constraint);

    }
    //function Definition to attach a body to the constraint
    attach(bodyInput) {
        this.constraint.bodyA = bodyInput;
    }
    //function Definition to detach a body from constraint
    detach() {
        this.constraint.bodyA = null;
    }

    display() {
        image(this.sling1, 200, 20);
        image(this.sling2, 170, 20);

        //display constraint(rubberband: 2 lines) only if bodyA is attached to it
        //i.e. this.constraint.bodyA != null
        if (this.constraint.bodyA) {
            var pointA = this.constraint.bodyA.position;
            var pointB = this.constraint.pointB;

            push();

            //display of constraint to hold bird and attach it to slingshot
            stroke(48, 22, 8);

            if (pointA.x < 220) {
                strokeWeight(7);
                line(pointA.x - 20, pointA.y, pointB.x - 10, pointB.y);
                line(pointA.x - 20, pointA.y, pointB.x + 30, pointB.y - 3);
                image(this.sling3, pointA.x - 30, pointA.y - 10, 15, 30);
            }
            else {
                strokeWeight(3);
                line(pointA.x + 25, pointA.y, pointB.x - 10, pointB.y);
                line(pointA.x + 25, pointA.y, pointB.x + 30, pointB.y - 3);
                image(this.sling3, pointA.x + 25, pointA.y - 10, 15, 30);
            }
            
            pop(); 


        }


    }
};
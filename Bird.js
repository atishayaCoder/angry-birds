class Bird extends BaseClass {
    constructor(xInput, yInput) {
        super(xInput, yInput, 50, 50);
        this.image = loadImage("image/bird.png");
        this.trajectory = [];
        this.smokeImage = loadImage("image/smoke.png")
    }
}
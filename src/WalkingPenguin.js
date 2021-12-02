class WalkingPenguin {
    constructor(leftBorder, rightBorder, moveSpeed, domObject) {
        this.object = domObject;
        this.x = leftBorder;
        this.moveRight = true;

        this.leftBorder = leftBorder;
        this.rightBorder = rightBorder;
        this.moveSpeed = moveSpeed;
    }
    doUpdate() {
        console.log("lel");
        if (this.moveRight) {
            if (this.x <= this.rightBorder) {
                this.x += this.moveSpeed;
            } else {
                this.moveRight = false;
                this.object.style.transform = "scaleX(-1)";
            }
        } else {
            if (this.x >= this.leftBorder) {
                this.x -= this.moveSpeed;
            } else {
                this.moveRight = true;
                this.object.style.transform = "scaleX(1)";
            }
        }
        this.object.style.left = this.x + "%";
    }
}
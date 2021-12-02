/**
 * Penguins that walk randomly on the iceberg
 * The are bound by array boundaries that I have set manually
 */
class WalkingPenguin {
    constructor(boundary, gap, leftBorder, rightBorder, y, moveSpeed, object) {
        
        this.boundary = boundary;
        this.gap = gap;
        this.object = object;
        this.x = leftBorder + Math.random() * (rightBorder - leftBorder);
        this.movingRight = true;
        this.faceDirection(Math.random() < 0.55 ? "left" : "right");

        this.leftBorder = leftBorder;
        this.rightBorder = rightBorder;
        this.moveSpeed = moveSpeed;

        this.vertical = "none"; // Up, down or none

        this.y = y;
        this.object.style.top = `${this.y}px`;

        this.stopTimer = 0;

        this.verticalTimer = 0;
    }

    /**
     * Face left or right 
     * dir either "left" or "right"
     */
    faceDirection(dir) {
        if (dir == "right") {
            this.movingRight = true;
            this.object.style.transform = "scaleX(1)";
        } else {
            this.movingRight = false;
            this.object.style.transform = "scaleX(-1)";
        }
    }


    /**
     * Move right
     */
    moveRight() {
        if (this.x <= this.rightBorder) {
            this.x += this.moveSpeed;
        } else {
            this.faceDirection("left");
        }
    }

    /**
     * Move left
     */
    moveLeft() {
        if (this.x >= this.leftBorder) {
            this.x -= this.moveSpeed;
        } else {
            this.faceDirection("right");
        }
    }

    /**
     * Move up if within boundary
     */
    moveUp() {
        var index = Math.floor(this.y/this.gap);
        var upIndex = Math.floor((this.y-this.moveSpeed)/this.gap);
        if (index > 0 && this.x >= this.boundary[upIndex][0] && this.x <= this.boundary[upIndex][1]) {
            this.y -= this.moveSpeed;
            this.leftBorder = this.boundary[upIndex][0];
            this.rightBorder = this.boundary[upIndex][1];
        }
        this.object.style.zIndex = 3 + upIndex;
    }

    /**
     * Move down if with boundary
     */
    moveDown() {
        var index = Math.floor(this.y/this.gap);
        var downIndex = Math.floor((this.y+this.moveSpeed)/this.gap);
        if (index < this.boundary.length-1 && this.x >= this.boundary[downIndex][0] && this.x <= this.boundary[downIndex][1]) {
            this.y += this.moveSpeed;
            this.leftBorder = this.boundary[downIndex][0];
            this.rightBorder = this.boundary[downIndex][1];
        }
        this.object.style.zIndex = 3 + downIndex;
    }

    /**
     * Decide whether to go up, down or no vertical
     */
    decideVerticalMovement() {
        if (Math.random() < 0.01) {
            var random = Math.random();
            if (random < 0.33) {
                this.vertical = "up";
                this.verticalTimer = Math.random() * 60;
            } else if (random < 0.66) {
                this.vertical = "down";
                this.verticalTimer = Math.random() * 60;
            } else {
                this.vertical = "none";
            }
        }
    }

    /**
     * Update penguin movement
     */
    doUpdate() {

        // Penguin deciding to stop or not
        if (this.stopTimer == 0 && Math.random() < 0.001) {
            this.stopTimer = 60 + (Math.random() * 60)*5;
            this.vertical = "none";
        }
        
        // Stopped for a bit
        if (this.stopTimer > 0) {
            this.stopTimer--;

        // Continue to move
        } else {

            // Penguin decide to change directions randomly
            if (Math.random() < 0.001) {
                var dir = this.movingRight == true ? "left" : "right";
                this.faceDirection(dir);
            }

            // Moving left and right
            if (this.movingRight) {
                this.moveRight();
            } else {
                this.moveLeft();
            }

            // Set limit on the vertical travel
            if (this.verticalTimer > 0) {
                this.verticalTimer--;
                if (this.verticalTimer == 0) {
                    this.vertical = "none";
                }
            }

            // Penguin decide whether to go up, down or nothing
            this.decideVerticalMovement();

            // Move up
            if (this.vertical == "up") {
                this.moveUp();  

            // Move down
            } else if (this.vertical == "down") {
                this.moveDown();
            }
        }
        
        this.object.style.left = `${this.x}px`;
        this.object.style.top = `${this.y}px`;
    }
}
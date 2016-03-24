Sup.ArcadePhysics2D.setGravity(0, -0.02);

let Camera = new Sup.Actor("Camera Man");
    new Sup.Camera(Camera);
    Camera.setPosition(0, 0, 5);

class PlayerBehavior extends Sup.Behavior {
  speed = 0.3;
  jumpSpeed = 0.45;

  update() {
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());

    let velocity = this.actor.arcadeBody2D.getVelocity();

    if (Sup.Input.isKeyDown("LEFT")) {
      velocity.x = -this.speed;
      this.actor.spriteRenderer.setHorizontalFlip(true);
    } else if (Sup.Input.isKeyDown("RIGHT")) {
      velocity.x = this.speed;
      this.actor.spriteRenderer.setHorizontalFlip(false);
    } else velocity.x = 0;

    // If the player is on the ground and wants to jump,
    // we update the `.y` component accordingly
    let touchBottom = this.actor.arcadeBody2D.getTouches().bottom;
    if (touchBottom) {
      if (Sup.Input.wasKeyJustPressed("UP") || Sup.Input.wasKeyJustPressed("SPACE")) {
        velocity.y = this.jumpSpeed;
        this.actor.spriteRenderer.setAnimation("Jump");
      } else {
        if (velocity.x === 0) this.actor.spriteRenderer.setAnimation("Idle");
        else {
          this.actor.spriteRenderer.setAnimation("Run");
          Camera.setPosition(this.actor.getX(), this.actor.getY())          
        }
      }
    } else {
      // Here, we should play either "Jump" or "Fall" depending on the vertical speed
      if (velocity.y >= 0) this.actor.spriteRenderer.setAnimation("Jump");
      else this.actor.spriteRenderer.setAnimation("Fall");
    }

    // Finally, we apply the velocity back to the ArcadePhysics body
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
}
Sup.registerBehavior(PlayerBehavior);

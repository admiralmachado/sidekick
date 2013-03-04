#pragma strict

var speed : float = 10;
private var charController : CharacterController;
private var hasTarget : boolean = false;
private var target : Vector3 = Vector3.zero;
private var face : FaceDirection;

function Start() {
	charController = gameObject.GetComponent(CharacterController);
	face = gameObject.GetComponent(FaceDirection);
}

function clearTarget() {
	hasTarget = false;
}

function Update () {
	var move : Vector3 = Vector3.zero;
	if(Input.GetMouseButtonDown(1)) {
		target = Camera.main.ScreenToWorldPoint(Input.mousePosition);
		target.z = 0;
		hasTarget = true;
	}
	
	if(hasTarget) {
		move = Vector3.MoveTowards(transform.position, target, speed * Time.deltaTime) - transform.position;
		charController.Move(move);
		if (transform.position == target)
			hasTarget = false;
	}
	
	var horizontal = Input.GetAxis("Horizontal");
	var vertical = Input.GetAxis("Vertical");
	if (horizontal!=0 || vertical !=0) {
		hasTarget = false;
		move = Vector3(horizontal, vertical, -transform.position.z);
		move *= speed * Time.deltaTime;
		charController.Move(move);
	}
	
	if (move != Vector3.zero)
		face.moved(move);
}
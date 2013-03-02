#pragma strict

var speed : float = 10;
private var charController : CharacterController;
private var hasTarget : boolean = false;
private var target : Vector3 = Vector3.zero;

function Start() {
	charController = gameObject.GetComponent(CharacterController);
}

function clearTarget() {
	hasTarget = false;
}

function Update () {
	var move : Vector3;
	if(Input.GetMouseButtonDown(1)) {
		target = Camera.main.ScreenToWorldPoint(Input.mousePosition);
		target.z = transform.position.z;
		hasTarget = true;
	}
	
	if(hasTarget) {
		move = Vector3.MoveTowards(transform.position, target, speed * Time.deltaTime) - transform.position;
		charController.Move(move);
	}
	
	var horizontal = Input.GetAxis("Horizontal");
	var vertical = Input.GetAxis("Vertical");
	if (horizontal!=0 || vertical !=0) {
		hasTarget = false;
		move = Vector3(horizontal, vertical, 0);
		move *= speed * Time.deltaTime;
		charController.Move(move);
	}
}
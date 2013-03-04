#pragma strict

var speed : float = 7.5;
private var charController : CharacterController;
var hasTarget : boolean = false;
var target : Vector3 = Vector3.zero;
private var face : FaceDirection;

function Start () {
	charController = gameObject.GetComponent(CharacterController);
	face = gameObject.GetComponent(FaceDirection);
}

function clearTarget() {
	hasTarget = false;
}

function setTarget(newTarget : Vector3) {
	target = newTarget;
	target.z = 0;
	hasTarget = true;
}

function getHasTarget() {
	return hasTarget;
}

function Update () {
	if(hasTarget) {
		var move : Vector3;
		move = Vector3.MoveTowards(transform.position, target, speed * Time.deltaTime) - transform.position;
		charController.Move(move);
		face.moved(move);
		
		if (transform.position == target) {
			hasTarget = false;
		}
	}
}
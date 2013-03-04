#pragma strict

var face : Vector3 = Vector3.down;

function moved(movement : Vector3) {
	var newFace : Vector3;
	if (Mathf.Abs(movement.x) < Mathf.Abs(movement.y)) {
		// Vertical
		if (movement.y > 0) {
			newFace = Vector3.up;
		} else {
			newFace = Vector3.down;
		}
	} else {
		// Horizontal
		if (movement.x > 0) {
			newFace = Vector3.right;
		} else { 
			newFace = Vector3.left;
		}
	}
	if (newFace != face) {
		changeFace(newFace);
	}
}

function changeFace(newFace : Vector3) {
	face = newFace;
	// Notify sprites and sight change here
}

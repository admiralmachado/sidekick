#pragma strict

import System.Collections.Generic;

var mobsInThisRoom : List.<GameObject>;
private var heroIsHere : boolean;
private var sidekickIsHere : boolean;

function Start() {
	mobsInThisRoom = new List.<GameObject>();
	heroIsHere = false;
	sidekickIsHere = false;
}

function isHeroHere() {
	return heroIsHere;
}

function isSidekickHere() {
	return sidekickIsHere;
}

function OnTriggerEnter(objCollider : Collider) {
	var obj : GameObject = objCollider.gameObject;
	switch (obj.name) {
		case "Hero":
			if (!heroIsHere) {
				heroIsHere = true;
				obj.GetComponent(Behavior).setRoom(gameObject);
			}
			break;
		case "Mob":
			if (!mobsInThisRoom.Contains(obj)) {
				mobsInThisRoom.Add(obj);
				obj.GetComponent(Behavior).setRoom(gameObject);
			}
			break;
		case "Sidekick":
			if (!sidekickIsHere) {
				sidekickIsHere = true;
				obj.GetComponent(Behavior).setRoom(gameObject);
			}
			break;
	}
}

function OnTriggerExit(objCollider : Collider) {
	switch (objCollider.name) {
		case "Hero":
			heroIsHere = false;
			break;
		case "Mob":
			mobsInThisRoom.Remove(objCollider.gameObject);
			break;
		case "Sidekick":
			sidekickIsHere = false;
			break;
	}
}
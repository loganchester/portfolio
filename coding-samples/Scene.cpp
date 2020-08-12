#include "Scene.h"

#include "Colour.h"
#include "ImageDisplay.h"
#include "utility.h"

Scene::Scene() : backgroundColour(0,0,0), ambientLight(0,0,0), maxRayDepth(3), renderWidth(800), renderHeight(600), filename("render.png"), camera_(), objects_(), lights_() {

}

Scene::~Scene() {

}

void Scene::render() const {
	ImageDisplay display("Render", renderWidth, renderHeight);

	const double w = double(renderWidth);
	const double h = double(renderHeight);

	for (unsigned int v = 0; v < renderHeight; ++v) {
		for (unsigned int u = 0; u < renderWidth; ++u) {
			double cu = -1 + (u + 0.5)*(2.0 / w);
			double cv = -h/w + (v + 0.5)*(2.0 / w);
			Ray ray = camera_->castRay(cu, cv);
			display.set(u, v, computeColour(ray, maxRayDepth));
		}
		display.refresh();
	}

	display.save(filename);
	display.pause(20);
}

RayIntersection Scene::intersect(const Ray& ray) const {
	RayIntersection firstHit;
	firstHit.distance = infinity;	
	for (const auto & obj : objects_) {
		for (const auto & hit : obj->intersect(ray)) {
			if (hit.distance > epsilon && hit.distance < firstHit.distance) {
				firstHit = hit;
			}
		}
	}	
	return firstHit;
}

Colour Scene::computeColour(const Ray& ray, unsigned int rayDepth) const {
	RayIntersection hitPoint = intersect(ray);
	if (hitPoint.distance == infinity) {
		return backgroundColour;
	}

	Colour hitColour(0, 0, 0);

	// compute normal and view vectors
	Vector n = hitPoint.normal/hitPoint.normal.norm();
	Vector v = -ray.direction/ray.direction.norm();

	for (const auto & light : lights_) {
		// compute the influence of this light on the appearance of the hit object.
		if (light->getDistanceToLight(hitPoint.point) < 0) {
			// an ambient light, ignore shadows and add appropriate colour
			hitColour += light->getIlluminationAt(hitPoint.point) * hitPoint.material.ambientColour;
		}
		else {
			// vectors for diffuse, specular, and shadows
			Vector l = light->getLightDirection(hitPoint.point);
			l = -l/l.norm();
			Vector r = 2*(n.dot(l))*n-l;

			// create a shadow ray and its hit point 
			Ray shadowRay;
			shadowRay.point = hitPoint.point;
			shadowRay.direction = l;
			RayIntersection shadowHitPoint = intersect(shadowRay);

			if (shadowHitPoint.distance >= (light->getDistanceToLight(hitPoint.point))) {
				// there is no shadow at this point, compute diffuse and specular light
				if (n.dot(l) > 0) {
					// light is not behind the object
					// illumination
					Colour illum = light->getIlluminationAt(hitPoint.point);

					// diffuse
					hitColour += illum * hitPoint.material.diffuseColour * n.dot(l);
					
					// specular
					hitColour += illum* hitPoint.material.specularColour * pow(r.dot(v), hitPoint.material.specularExponent);
				}
			}
		}
	}

	// mirror computation
	if (rayDepth > 0) {
		// create a mirror ray
		Ray mirrorRay;
		mirrorRay.point = hitPoint.point;
		// we use the normal and view vectors from above to compute the mirror vector
		Vector m = 2*(n.dot(v))*n-v;
		mirrorRay.direction = m;
		Colour white(1, 1, 1);
		// recursively compute mirror colour
		Colour mirror = computeColour(mirrorRay, rayDepth-1);
		// mix mirror and hitpoint colours
		hitColour = (white - hitPoint.material.mirrorColour)*hitColour + hitPoint.material.mirrorColour*mirror;
		
	}

	hitColour.clip();
	return hitColour;
}

bool Scene::hasCamera() const {
	return bool(camera_);
}

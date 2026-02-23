uniform float uPixelRatio;
uniform float uSize;
uniform float uTime;

attribute float aScale;

void main() {
	vec4 modelPosition = modelMatrix * vec4(position, 1.0);
	modelPosition.y += sin(uTime + modelPosition.x * 100.0) * aScale * 0.2;

	vec4 viewPosition = viewMatrix * modelPosition;

	gl_Position = projectionMatrix * viewPosition;
	gl_PointSize = uPixelRatio * uSize * aScale;
	gl_PointSize *= (1.0 / - viewPosition.z);
}
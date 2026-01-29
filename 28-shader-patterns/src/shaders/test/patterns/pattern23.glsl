varying vec2 vUv;

float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main()
{
	float strength = rand(vUv);

    gl_FragColor = vec4(vec3(strength), 1.0);
}
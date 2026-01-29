varying vec2 vUv;

float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main()
{
    float y = floor(vUv.x * 10.0) / 10.0;
    float x = floor((vUv.y + vUv.x * 0.5) * 10.0) / 10.0;
	float strength = rand(vec2(y, x));

    gl_FragColor = vec4(vec3(strength), 1.0);
}
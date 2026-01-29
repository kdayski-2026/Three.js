varying vec2 vUv;

void main()
{
    float y = floor(vUv.x * 10.0) / 10.0;
    float x = floor(vUv.y * 10.0) / 10.0;
	float strength = x * y;

    gl_FragColor = vec4(vec3(strength), 1.0);
}
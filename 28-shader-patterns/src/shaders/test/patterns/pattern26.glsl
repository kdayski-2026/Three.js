varying vec2 vUv;

void main()
{
	// float strength = 1.0 - (1.0 - vUv.x) * (1.0 - vUv.y);

    // OR

    float strength = length(vUv);

    gl_FragColor = vec4(vec3(strength), 1.0);
}
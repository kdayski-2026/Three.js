varying vec2 vUv;

void main()
{
    float strength = 0.015 / distance(vec2(
        vUv.x * 0.1 + 0.45,
        vUv.y * 0.5 + 0.25
        ), vec2(0.5));

    gl_FragColor = vec4(vec3(strength), 1.0);
}
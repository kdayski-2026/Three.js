varying vec2 vUv;

void main()
{
    float x = abs(vUv.x - 0.5);
    float y = abs(vUv.y - 0.5);
    float strength = max(x, y);

    gl_FragColor = vec4(vec3(strength), 1.0);
}
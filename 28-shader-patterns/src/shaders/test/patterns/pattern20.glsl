varying vec2 vUv;

void main()
{
    float x = abs(vUv.x - 0.5);
    float y = abs(vUv.y - 0.5);
    float square1 = step(0.2, max(x, y));
    float square2 = 1.0 - step(0.25, max(x, y));
    float strength = square1 * square2;

    gl_FragColor = vec4(vec3(strength), 1.0);
}
varying vec2 vUv;

void main()
{
    // float strength = length(vec2(vUv.x - 0.5, vUv.y - 0.5));

    // OR

    float strength = distance(vUv, vec2(0.5));

    gl_FragColor = vec4(vec3(strength), 1.0);
}
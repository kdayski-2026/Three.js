#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

void main()
{
    float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    float square = angle / (PI * 2.0) + 0.5;
    float sinusoid = sin(square * 100.0);

    float radius = 0.25 + sinusoid * 0.02;
    float circle = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - radius));
    
    float strength = circle;

    gl_FragColor = vec4(vec3(strength), 1.0);
}
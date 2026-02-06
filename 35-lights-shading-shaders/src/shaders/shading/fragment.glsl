uniform vec3 uColor;
uniform vec3 uAmbientColor;
uniform float uAmbientIntensity;
uniform vec3 uDirectionalColor;
uniform float uDirectionalIntensity;
uniform float uDirectionalSpeculaPower;
uniform vec3 uPointColor;
uniform float uPointIntensity;
uniform float uPointSpeculaPower;
uniform float uLightDecay;

varying vec3 vNormal;
varying vec3 vPosition;

#include ../includes/ambientLight.glsl
#include ../includes/directionalLight.glsl
#include ../includes/pointLight.glsl

void main()
{
    vec3 normal = normalize(vNormal);
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 color = uColor;

    // Lights
    vec3 light = vec3(0.0);

    // Ambient
    light += ambientLight(
        uAmbientColor, 
        uAmbientIntensity
    );

    // Directional
    light += directionalLight(
        uDirectionalColor, 
        uDirectionalIntensity,
        normal,
        vec3(0.0, 0.0, 3.0),
        viewDirection,
        uDirectionalSpeculaPower
    );

    // Point
    light += pointLight(
        uPointColor, 
        uPointIntensity,
        normal,
        vec3(0.0, 2.5, 0.0),
        viewDirection,
        uPointSpeculaPower,
        vPosition,
        uLightDecay
    );

    color *= light;

    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
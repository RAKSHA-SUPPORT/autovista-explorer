# 3D viewer verification notes

The live vehicle detail route initially exposed a React Three Fiber runtime error because a raw DOM fallback was being reconciled inside the canvas. The viewer was repaired by moving the loading UI through drei Html and removing the raw Canvas fallback node. A cache-busted live navigation no longer showed the R3F error page; the page continued loading the large GLB scene, so the route now requires a longer asset load window before visual capture.

The GLB endpoint responds with HTTP 307 to managed CloudFront storage, confirming the uploaded model path is reachable. The GLB metadata contains 35 nodes, including `BodyParts_1` and `WHeelsandrims_2`, with 30 meshes. The viewer loads it with `GLTFLoader`, applies studio environment lighting, metallic material tuning, shadows, reflective floor treatment, and mapped body/doors/hood/engine/chassis/wheels animation groups.

## External sources

The candidate asset source repository is https://github.com/coopercodes/bmwGLB. Its README identifies the source model as “BMW M4 Competition M Package” by SRT Performance™ and states the asset is licensed under Creative Commons Attribution 4.0: https://creativecommons.org/licenses/by/4.0/. The source Sketchfab listing is https://sketchfab.com/3d-models/bmw-m4-competition-m-package-5c0a2dafb1ad408d9fc9eeef9aee531b. A separate Sketchfab listing describing the separated-parts workflow is https://sketchfab.com/3d-models/real-car-4-separated-parts-1d2f29140fa144ff987fb9b62d22ec2e; it states that its wheels, doors, mirrors, bonnet, and boot are separate/ready to animate. The checked-in GLB export exposes named grouping roots `BodyParts_1` and `WHeelsandrims_2`; the remaining body meshes are exported with generic `Object_*` names, so the app’s non-wheel part mapping is intentionally documented as a stable mesh-order classification rather than a claim that those generic nodes carry semantic names.

## Final runtime pass

After the loading-boundary and Canvas fallback fixes, cache-busted browser navigation no longer produced the prior `R3F: Div is not part of the THREE namespace` error. The browser returned to the normal AutoVista shell and footer, including `Developed by R.A.K.S.H.A labs`. The large remote GLB continues loading asynchronously; preview capture can show the neutral canvas surface before the asset finishes, but typecheck, 15 Vitest tests, and production build all pass. The explicit WebGL detector and error boundary now protect unsupported/error cases.

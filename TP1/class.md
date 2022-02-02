Class RenderSession

Class RenderState

Class Scene

Class Camera

Class Film

Class RenderConfig

Class FilmImpl : public Film

Class SceneImpl : public Scene

Class CameraImpl : public Camera
	friend class SceneImpl

Class SceneImpl : public Scene
	const Camera
	friend CameraImpl
	friend RenderConfigImpl
	friend RenderSessionImpl

Class RenderConfigImpl : public RenderConfig
	const Scene
 	friend Class RenderSessionImpl


Class RenderStateImpl : public RenderState
 	friend Class RenderSessionImpl


Class RenderSessionImpl : public RenderSession
	const RenderConfig
 	friend Class FilmImpl


const { setUser } = useContext(UserContext);
const navigate = useNavigate();

const { mutate } = useMutation({
  mutationKey: ["Login"],
  mutationFn: () => login(loginInputs),
  onSuccess: (data) => {
    setUser({
      isAuthenticated: true,
      role: data.role, // Store the role in the global state
    });

    if (data.role === "storeManager") {
      navigate("/storedashboard");
    } else if (data.role === "areaManager") {
      navigate("/areadashboard");
    } else if (data.role === "salesPerson") {
      navigate("/salesdashboard");
    }
  },
  onError: (error) => {
    console.log("wrong email or password" || error.response?.data?.error);
  },
});

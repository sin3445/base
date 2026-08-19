async function test() {
  try {
    // Register
    console.log('Registering user...');
    let user;
    try {
      const res = await fetch('http://localhost:3000/usuarios/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: 'Test User',
          correo: 'test@example.com',
          contrasena: 'password'
        })
      });
      if (!res.ok && res.status === 400) {
        console.log('User already exists, logging in...');
        const loginRes = await fetch('http://localhost:3000/usuarios/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            correo: 'test@example.com',
            contrasena: 'password'
          })
        });
        const data = await loginRes.json();
        user = data.usuario;
      } else if (!res.ok) {
        const err = await res.json();
        throw new Error(JSON.stringify(err));
      } else {
        const data = await res.json();
        user = data.usuario;
        console.log('Registered:', user);
      }
    } catch (e) {
      throw e;
    }

    console.log('User ID:', user.id);

    // Create client
    console.log('Creating client...');
    const clientRes = await fetch('http://localhost:3000/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: 'Client Test',
        telefono: '123456',
        usuarioId: user.id
      })
    });
    if (!clientRes.ok) {
      const err = await clientRes.json();
      throw new Error('Client creation failed: ' + JSON.stringify(err));
    }
    const clientData = await clientRes.json();
    console.log('Client created:', clientData);

    // Create pedido
    console.log('Creating pedido...');
    const pedidoRes = await fetch('http://localhost:3000/pedidos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        descripcion: 'Test Pedido',
        total: 100,
        clienteId: clientData.id,
        usuarioId: user.id
      })
    });
    if (!pedidoRes.ok) {
      const err = await pedidoRes.json();
      throw new Error('Pedido creation failed: ' + JSON.stringify(err));
    }
    const pedidoData = await pedidoRes.json();
    console.log('Pedido created:', pedidoData);

  } catch (err) {
    console.error('Error occurred:', err.message);
  }
}

test();

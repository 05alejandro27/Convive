package com.convive.backend.security;

import com.convive.backend.model.entity.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {

    //Busca la clave definida para meter el valor en el campo, así solo hay que modificar un archivo
    @Value("${application.security.jwt.secret-key}")
    private String secretKey;

    //Busca la clave definida para meter el valor en el campo, así solo hay que modificar un archivo
    @Value("${application.security.jwt.expiration}")
    private long jwtExpiration;

    public String generateToken(User user, Long communityId) {
        //Creamos un mapa vacio donde metermos los datos que queremos incluir en el token
        Map<String, Object> extraClaims = new HashMap<>();
        //Añade el id de la comunidad al token
        extraClaims.put("communityId", communityId);
        //Añade el role del usuario al token
        extraClaims.put("role", user.getRole().name());
        //Añade el nombre del usuario al token (Para el saludo de home)
        extraClaims.put("firstName", user.getFirstName());

        //Empieza a construir el token usando el patron builder
        return Jwts.builder()
                //Mete los datos extras en el token
                .claims(extraClaims)
                //Estable el sujeto del token, básicamente el que identifica a quien le pertenece
                .subject(user.getId().toString())
                //Establece la fecha y hora a la que se creo
                .issuedAt(new Date())
                //Establece la fecha de expiración, que es los milisegundos actuales + 86400000 milisegundos, por lo que expiraria en 24 horas
                .expiration(new Date(System.currentTimeMillis() + jwtExpiration))
                //Firma el token con la clave secreta para que nadie pueda modificar el contenido
                .signWith(getSignInKey())
                //Construye el token y lo devuelve en una cadena compacta
                .compact();
    }

    //Es el metodo para firmar
    private SecretKey getSignInKey() {
        //Descodifica el codigo secreto en un formato valido para el algoritmo de firmado
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        //Devuelve la clave de tipo HMAC-SHA
        return Keys.hmacShaKeyFor(keyBytes);
    }

}
